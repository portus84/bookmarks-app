import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Bookmark} from '../../models/bookmark';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Store} from '@ngrx/store';
import {BookmarkState} from '../../store/reducer/bookmark.reducer';
import {saveBookmark} from '../../store/actions/bookmark.actions';

@Component({
  selector: 'app-bookmark-dialog',
  templateUrl: './bookmark-dialog.component.html',
  styleUrls: ['./bookmark-dialog.component.scss']
})
export class BookmarkDialogComponent implements OnInit {

  form: FormGroup;

  constructor(
    private store: Store<BookmarkState>,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<BookmarkDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Bookmark
  ) {
    this.form = new FormGroup({
      name: new FormControl(data?.name, [Validators.required]),
      url: new FormControl(data?.url, [Validators.required]),
      group: new FormControl(data?.group, [Validators.required]),
    });
  }

  ngOnInit(): void {
  }

  save(): void {
    this.store.dispatch(saveBookmark({
      id: this.data?.id,
      name: this.form.get('name').value,
      url: this.form.get('url').value,
      group: this.form.get('group').value
    }));

    this.dialogRef.close();
  }
}
