const streamToBase64 = async (createReadStream: any): Promise<string> => {
  const base64: string = await new Promise((resolve, reject) => {
    const stream = createReadStream();
    const buffers: any = [];
    stream.on('data', (chunk: any) => { buffers.push(chunk); });
    stream.once('end', () => {
      const buffer = Buffer.concat(buffers).toString('base64');
      resolve(buffer);
    });
    stream.once('error', (err: Error) => {
      reject(err);
    });
  });

  return base64;
};

export interface WithId {
  _id: string;
}

export { streamToBase64 };
