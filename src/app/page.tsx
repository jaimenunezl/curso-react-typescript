'use client';

import { useState } from 'react';
import React from 'react';
import type { MouseEventHandler } from 'react';

import { LazyImage } from './components/LazyImage';

function randomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function uniqueId(): string {
  return Math.random().toString(36).substr(2, 9);
}

type ImageItem = { id: string; url: string };

export default function Home() {
  const [images, setImages] = useState<ImageItem[]>([]);

  const addNewFox: MouseEventHandler<HTMLButtonElement> = (event): void => {
    event.preventDefault();

    const image: ImageItem = {
      id: uniqueId(),
      url: `https://randomfox.ca/images/${randomNumber(1, 123)}.jpg`,
    };

    setImages([...images, image]);
  };

  return (
    <div>
      <header className="flex justify-center">
        <h1 className="text-3xl mt-4">Foxes</h1>
      </header>
      <main className="flex min-h-screen flex-col items-center p-24">
        <button
          className="bg-blue-200 px-3 py-3 rounded-md font-semibold shadow hover:bg-blue-300 transition-colors"
          onClick={addNewFox}
        >
          Add new Fox
        </button>
        {images.map(({ id, url }) => (
          <LazyImage
            className="bg-gray-100 rounded m-3"
            key={id}
            src={url}
            width="320"
            onClick={() => console.log('I am a Fox', id)}
            onLazyLoad={() => console.log('I am lazy loaded', id)}
          />
        ))}

        {images.length === 0 && <p className="mt-6">No hay nada</p>}
      </main>
    </div>
  );
}
