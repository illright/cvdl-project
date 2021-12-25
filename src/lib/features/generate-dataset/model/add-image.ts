import type { BBox } from '$lib/shared/bounding-box';

import { dataset } from './store';
import type { SampleClass } from './type';

export async function addImage(
  image: HTMLCanvasElement,
  bbox: BBox,
  className: SampleClass
): Promise<void> {
  const [left, top, width, height] = bbox.map(Math.round);
  const imageData = await new Promise<Blob | null>((resolve) =>
    image.toBlob(resolve, 'image/jpeg', 0.9)
  );
  if (imageData !== null) {
    dataset.update(($dataset) => {
      $dataset.push({
        data: imageData,
        className,
        coordinates: [
          [left, top],
          [left + width, top + height],
        ],
      });
      return $dataset;
    });
  }
}
