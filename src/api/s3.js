export async function getUploadUrl(fileName, fileType) {
  const response = await fetch(window.env.REACT_APP_LAMBDA_UPLOAD_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ fileName, fileType }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to get upload URL: ${errorText}`);
  }

  const data = await response.json();

  if (!data.uploadUrl) {
    throw new Error('Upload URL missing from Lambda response');
  }

  return data.uploadUrl;
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
    throw new Error('S3 upload failed');
  }

  return uploadUrl.split('?')[0];
}
