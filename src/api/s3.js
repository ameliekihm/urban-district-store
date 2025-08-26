import { useState } from 'react';

export async function getUploadUrl(fileName, fileType) {
  const response = await fetch(window.env.REACT_APP_LAMBDA_UPLOAD_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ fileName, fileType }),
  });
  return response.json();
}

export async function uploadToS3(uploadUrl, file) {
  const res = await fetch(uploadUrl, {
    method: 'PUT',
    headers: {
      'Content-Type': file.type,
    },
    body: file,
  });

  if (!res.ok) {
    throw new Error('S3 upload failed.');
  }

  return uploadUrl.split('?')[0];
}
