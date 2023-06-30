import { Component, ElementRef, ViewChild } from '@angular/core';

type Corners = {
  top_left: { x: number; y: number };
  top_right: { x: number; y: number };
  bottom_left: { x: number; y: number };
  bottom_right: { x: number; y: number };
} | null;

@Component({
  selector: 'arivo-license-plate-marker',
  templateUrl: './license-plate-marker.component.html',
  styleUrls: ['./license-plate-marker.component.scss'],
})
export class LicensePlateMarkerComponent {
  imageUrl: string = '';
  corners: { x: number; y: number }[] = [];
  tempCorner: { x: number; y: number } | null = null;
  labeledCorners: Corners = null;

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  onFileChange(event: any): void {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e: any) => {
      this.imageUrl = e.target.result;
    };

    reader.readAsDataURL(file);
  }

  markCorner(event: MouseEvent): void {
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    if (this.corners.length === 4) {
      this.corners.shift();
    }

    this.corners.push({ x, y });
    this.updateLabeledCorners();
  }

  updateLabeledCorners(): void {
    if (this.corners.length === 4) {
      const sortedCorners = this.corners.slice().sort((a, b) => a.x - b.x);
      const [left, right] = sortedCorners.slice(0, 2).sort((a, b) => a.y - b.y);
      const [topLeft, bottomLeft] =
        sortedCorners.indexOf(left) < sortedCorners.indexOf(right)
          ? [left, right]
          : [right, left];
      const [topRight, bottomRight] = sortedCorners.filter(
        (corner) => corner !== topLeft && corner !== bottomLeft
      );

      this.labeledCorners = {
        top_left: { x: topLeft.x, y: topLeft.y },
        top_right: { x: topRight.x, y: topRight.y },
        bottom_left: { x: bottomLeft.x, y: bottomLeft.y },
        bottom_right: { x: bottomRight.x, y: bottomRight.y },
      };
    }
  }

  saveData(): void {
    const dataStr =
      'data:text/json;charset=utf-8,' +
      encodeURIComponent(JSON.stringify(this.labeledCorners));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute('href', dataStr);
    downloadAnchorNode.setAttribute('download', 'data.json');
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  }

  clearData(): void {
    this.corners = [];
  }

  resetImage(): void {
    this.imageUrl = '';
    this.clearData();
  }

  undoCorner(): void {
    this.tempCorner = this.corners.pop() || null;
  }

  redoCorner(): void {
    if (this.tempCorner) {
      this.corners.push(this.tempCorner);
      this.tempCorner = null;
    }
  }

  setImage(imageUrl: string): void {
    this.imageUrl = imageUrl;
  }

  openFileInput(): void {
    this.fileInput.nativeElement.click();
  }
}
