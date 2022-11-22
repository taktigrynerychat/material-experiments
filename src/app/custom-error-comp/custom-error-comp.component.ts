import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {AbstractControl, NgControl} from "@angular/forms";
import {combineLatest, distinctUntilChanged, map, Observable, startWith, Subject, takeUntil, tap} from "rxjs";

const errorsMap = new Map<string, (...args: any) => string>([
  ['required', () => 'This field is required'],
  ['minlength', (value) => `Minimum length must be ${value.requiredLength}`]
])

@Component({
  selector: 'input[tooltipError]',
  templateUrl: './custom-error-comp.component.html',
  styleUrls: ['./custom-error-comp.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[style.position.relative]': 'true'
  }
})
export class CustomErrorCompComponent implements OnInit, OnDestroy {
  @ViewChild('errorTemplate', {static: true})
  errorTemplate!: TemplateRef<any>;

  errorTexts!: string[] | null;

  destroy$: Subject<void> = new Subject<void>();

  constructor(private readonly viewContainerRef: ViewContainerRef, private ngControl: NgControl) {
  }

  public ngOnInit(): void {
    combineLatest([
      extractTouchedChanges(this.ngControl.control!),
      this.ngControl.statusChanges?.pipe(startWith(null))
    ]).pipe(
      takeUntil(this.destroy$),
      map(() => this.ngControl.errors),
      distinctUntilChanged(),
      tap(errors => {
        this.errorTexts = errors && Object.keys(errors)
          .filter(key => errorsMap.has(key))
          .map(key => errorsMap.get(key)!(errors[key]));
        if (errors) {
          this.viewContainerRef.createEmbeddedView(this.errorTemplate);
        } else {
          this.viewContainerRef.clear();
        }
      })
    ).subscribe()
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}


// https://stackoverflow.com/questions/41337024/how-to-observe-touched-event-on-angular-2-ngform

/**
 * Extract arguments of function
 */
export type ArgumentsType<F> = F extends (...args: infer A) => any ? A : never;

/**
 * Creates an object like O. Optionally provide minimum set of properties P which the objects must share to conform
 */
type ObjectLike<O extends object, P extends keyof O = keyof O> = Pick<O, P>;

export const extractTouchedChanges = (control: ObjectLike<AbstractControl, 'markAsTouched' | 'markAsUntouched'>): Observable<boolean> => {
  const prevMarkAsTouched = control.markAsTouched.bind(control);
  const prevMarkAsUntouched = control.markAsUntouched.bind(control);

  const touchedChanges$ = new Subject<boolean>();

  function nextMarkAsTouched(...args: ArgumentsType<AbstractControl['markAsTouched']>) {
    prevMarkAsTouched(...args);
    touchedChanges$.next(true);
  }

  function nextMarkAsUntouched(...args: ArgumentsType<AbstractControl['markAsUntouched']>) {
    prevMarkAsUntouched(...args);
    touchedChanges$.next(false);
  }

  control.markAsTouched = nextMarkAsTouched;
  control.markAsUntouched = nextMarkAsUntouched;

  return touchedChanges$;
}
