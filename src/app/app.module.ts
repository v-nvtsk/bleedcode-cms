import {provideHttpClient} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {MonacoEditorModule} from 'ngx-monaco-editor-v2';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    MonacoEditorModule.forRoot(),
  ],
  declarations: [],
  providers: [provideHttpClient()],
})
export class AppRoutingModule {}
