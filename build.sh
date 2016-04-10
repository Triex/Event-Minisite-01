#!/bin/bash

#
# Build a deployable package of the website
#
# For developer ease of use and happiness; it's way easier to run a script than
# to remember all these commands in order!
#

# Define variables
THEME_DIR="./themes/rfb-event-01"

# Check if Hugo is installed
hash hugo 2>/dev/null || {
  echo >&2 "Hugo is not installed. Get it from https://github.com/spf13/hugo/releases."
  exit 1
}

# Check if Node.js is installed
hash npm 2>/dev/null || {
  echo >&2 "Node.js is not installed. Install it before continuing."
  exit 1
}

# Check if Gulp is installed
hash gulp 2>/dev/null || {
  # Install Gulp
  npm -g i gulp-cli
}

# Check if necessary Node modules are already install
if [ ! -d "$THEME_DIR/node_modules" ]; then
  echo -e "Installing necessary node modules...\n"

  # Install Node modules
  npm install $THEME_DIR
else
  echo -e "Updating node modules...\n"
  
  # Update Node modules
  npm update $THEME_DIR --save --save-dev
fi

# Remove files from any ealier builds
rm -rf ./public

# Run Gulp build process
echo -e "Starting Gulp build process...\n"
gulp --gulpfile $THEME_DIR/gulpfile.js build

# Remove ealier deployable file, use -f so it doesn't fail if no file exists
rm -f ./deployme.tgz

# Create a deployable package
echo -e "Creating deployable file...\n"
tar zcf deployme.tgz ./public/*

echo -e "Build complete!"
