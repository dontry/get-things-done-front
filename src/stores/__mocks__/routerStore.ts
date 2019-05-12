module.exports = {
  push: jest.fn(path => console.log(`push ${path}`)),
  replace: jest.fn(path => console.log(`replace ${path}`))
};
