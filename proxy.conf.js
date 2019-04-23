module.exports = [
  {
    context: [
      '/documents'
    ],
    target: 'http://localhost:1337',
    secure: false
  },
  {
    context: [
      '/api'
    ],
    target: 'http://localhost:1337',
    secure: false
  },
  {
    context: [
      '/em-anno'
    ],
    target: 'http://localhost:1337',
    secure: false
  }
];
