import {
  COMMA, ENTER, SEMICOLON, TAB,
} from '@angular/cdk/keycodes';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  EventEmitter,
  input,
  model,
  Output,
} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {
  MatAutocompleteModule, MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import {
  MatChipInputEvent, MatChipsModule,
} from '@angular/material/chips';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'tags',
  templateUrl: './tags.component.html',
  styleUrl: './tags.component.css',
  imports: [MatFormFieldModule, MatChipsModule, MatIconModule, MatAutocompleteModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagsComponent {
  readonly title = 'Теги';

  readonly separatorKeysCodes: number[] = [ENTER, COMMA, SEMICOLON, TAB];

  readonly currentTag = model('');

  readonly tags = input<string[]>([]);

  readonly selectedTags = input<string[]>([]);

  @Output() tagsUpdated = new EventEmitter<string[]>();

  readonly filteredTags = computed(() => {
    const currentTag = this.currentTag().toLowerCase();
    const tags = this.tags();

    return currentTag
      ? tags.filter((tag) => !this.selectedTags().includes(tag)).filter((tag) => tag.toLowerCase().includes(currentTag))
      : tags.filter((tag) => !this.selectedTags().includes(tag));
  });

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value && !this.selectedTags().includes(value)) {
      const updatedTags = [...this.selectedTags(), value];

      this.tagsUpdated.emit(updatedTags);
    }
    this.currentTag.set('');
    event.chipInput.clear();
  }

  remove(tag: string): void {
    const updatedTags = this.selectedTags().filter((t) => t !== tag);

    this.tagsUpdated.emit(updatedTags);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    const value = event.option.viewValue.trim();

    if (!this.selectedTags().includes(value)) {
      const updatedTags = [...this.selectedTags(), value];

      this.tagsUpdated.emit(updatedTags);
    }
    this.currentTag.set('');
    event.option.deselect();
  }
}
