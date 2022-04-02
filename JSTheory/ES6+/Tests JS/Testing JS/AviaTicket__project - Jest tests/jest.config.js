module.exports = {
  clearMocks: true,//! чистить залишкові файли після тестування
  collectCoverageFrom: ['src/**/*.js'],//! територія для тестування
  coverageDirectory: 'coverage',//! папка із результатами тестування
  moduleFileExtensions: ['js'],//! типи файлів дял тестування
  testMatch: ['**/__tests__/**/*.js?(x)', '**/?(*.)+(spec|test).js?(x)'],//! тести шукатимуться в директорії __test__ чи файлах із розширенням spec / test
  testPathIgnorePatterns: ['\\\\node_modules\\\\'],//! ігнорування папки node_modules при тестуваннях
  transformIgnorePatterns: ['<rootDir>/node_modules/'],//! ігнорування папки node_modules при тестуваннях
  transform: {
    '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$':
      'jest-transform-stub',//! ігнорування цих типів данних при тестуванні, завдяки цьому типу данних
    '^.+\\.(js|jsx)?$': 'babel-jest'
  },
  // verbose: false,
};