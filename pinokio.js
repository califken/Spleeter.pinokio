module.exports = async kernel => {
  const config = {
      requires: [
          {
              type: 'conda',
              name: ['ffmpeg', 'spleeter'],
              args: '-c conda-forge'
          }
      ],
      run: [
          {
              method: 'input.file',
              params: {
                  title: 'Upload an audio file',
                  description: 'Please upload the audio file you want to process with Spleeter.',
                  accept: '.mp3, .wav'
              }
          },
          {
              method: 'input.select',
              params: {
                  title: 'Select the Spleeter separation model',
                  description: 'Choose the number of stems for separation.',
                  options: ['2stems', '4stems', '5stems']
              }
          },
          {
              method: 'shell.run',
              params: {
                  message: 'spleeter separate -o output/ -p spleeter:${model} ${input}',
                  env: {
                      model: '${input.select[1]}',
                      input: '${input.file[0].path}'
                  }
              }
          },
          {
              method: 'output.directory',
              params: {
                  path: 'output/',
                  title: 'Processed Files',
                  description: 'Download the separated audio tracks.'
              }
          }
      ]
  };

  return config;
};
