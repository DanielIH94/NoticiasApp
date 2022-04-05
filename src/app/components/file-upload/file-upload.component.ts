import { Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.sass'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: FileUploadComponent,
      multi: true
    }
  ]
})
export class FileUploadComponent implements ControlValueAccessor {
  
  @ViewChild('inputFile') inputFile:any
  
  @Input() progress: any
  onChange!: Function
  file: File | null = null

  @HostListener('change', ['$event.target.files']) emitFiles(event: FileList) {
    const file = event && event.item(0)
    this.onChange(file)
    this.file = file
  }

  constructor(private host: ElementRef<HTMLInputElement>) {
  }

  writeValue(value: null) {
    this.host.nativeElement.value = '';
    this.file = null;
  }

  registerOnChange(fn: Function) {
    this.onChange = fn;
  }

  registerOnTouched(fn: Function) {
  }

  selectFile(e:Event){
    e.preventDefault()
    this.inputFile.nativeElement.click()
    
  }
}
