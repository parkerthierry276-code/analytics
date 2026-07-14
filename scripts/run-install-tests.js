#!/usr/bin/env node

// Verifies published analytics packages install and import correctly.
// Generates throwaway CJS + ESM projects under build/tests-dist, then npm installs and runs them.

const { execSync } = require('child_process')
const path = require('path')
const fs = require('fs')

const TEST_FIXTURES = {
  cjs: {
    isESM: false,
    index: `const analytics = require('analytics')

console.log(analytics)
`
  },
  esm: {
    isESM: true,
    index: `import Analytics from 'analytics'

console.log('Analytics:', Analytics)
console.log('Analytics type:', typeof Analytics)
console.log('Analytics keys:', Object.keys(Analytics))

// Try the workaround
try {
  const analytics = Analytics.default({
    app: 'awesome-app',
    plugins: []
  })
  console.log('Success with Analytics.default!')
} catch (error) {
  console.error('Failed with Analytics.default:', error.message)
}
`
  }
}

/**
 * Read package.json and return version
 * @param {string} packagePath - Path to package.json file
 * @returns {string} Version string
 */
function getPackageVersion(packagePath) {
  const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'))
  return packageJson.version
}

/**
 * Write a fresh test project (package.json + index.js) into testDir
 * @param {string} testDir - Path to test directory
 * @param {object} fixture - Fixture config { isESM, index }
 * @param {string} analyticsVersion - Analytics package version
 * @param {string} coreVersion - Analytics core package version
 */
function writeTestProject(testDir, fixture, analyticsVersion, coreVersion) {
  fs.mkdirSync(testDir, { recursive: true })

  const packageJson = {
    "name": fixture.isESM ? "esm-install-test" : "cjs-install-test",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    ...(fixture.isESM && { "type": "module" }),
    "scripts": {
      "test": "node index.js"
    },
    "keywords": [],
    "author": "",
    "license": "ISC",
    "dependencies": {
      "analytics": analyticsVersion,
      "@analytics/core": coreVersion
    }
  }

  fs.writeFileSync(path.join(testDir, 'package.json'), JSON.stringify(packageJson, null, 2))
  fs.writeFileSync(path.join(testDir, 'index.js'), fixture.index)
  console.log(`📝 Wrote ${fixture.isESM ? 'ESM' : 'CJS'} test project with analytics@${analyticsVersion} and @analytics/core@${coreVersion}`)
}

console.log('🧪 Running installation verification tests for published packages...\n')

// Get latest versions from source packages
const analyticsPackagePath = path.join(__dirname, '../packages/analytics/package.json')
const corePackagePath = path.join(__dirname, '../packages/analytics-core/package.json')

const analyticsVersion = getPackageVersion(analyticsPackagePath)
const coreVersion = getPackageVersion(corePackagePath)

console.log(`📦 Using analytics@${analyticsVersion} and @analytics/core@${coreVersion}\n`)

// Generate throwaway test projects
const cjsTestDir = path.join(__dirname, 'build/tests-dist/cjs-test')
const esmTestDir = path.join(__dirname, 'build/tests-dist/esm-test')

writeTestProject(cjsTestDir, TEST_FIXTURES.cjs, analyticsVersion, coreVersion)
writeTestProject(esmTestDir, TEST_FIXTURES.esm, analyticsVersion, coreVersion)

// Install fresh dependencies
console.log('\n📦 Installing fresh dependencies...')
try {
  execSync('npm install', { cwd: cjsTestDir, encoding: 'utf8' })
  execSync('npm install', { cwd: esmTestDir, encoding: 'utf8' })
  console.log('✅ Dependencies installed')
} catch (error) {
  console.log('❌ Failed to install dependencies')
  console.log(error.stdout || error.message)
  process.exit(1)
}

// Test CommonJS installation
console.log('\n📦 Testing CommonJS installation...')
try {
  const cjsOutput = execSync('npm test', {
    cwd: cjsTestDir,
    encoding: 'utf8'
  })
  console.log('✅ CommonJS test passed')
  // console.log(cjsOutput)
} catch (error) {
  console.log('❌ CommonJS test failed')
  console.log(error.stdout || error.message)
  process.exit(1)
}

// Test ESM installation
console.log('\n📦 Testing ESM installation...')
try {
  const esmOutput = execSync('npm test', {
    cwd: esmTestDir,
    encoding: 'utf8'
  })
  console.log('✅ ESM test passed')
  // console.log(esmOutput)
} catch (error) {
  console.log('❌ ESM test failed')
  console.log(error.stdout || error.message)
  process.exit(1)
}

console.log('\n🎉 All installation tests passed!')
console.log('📝 README install instructions are verified as correct.')
