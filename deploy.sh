#!/bin/bash

# Build the project
echo "Building project..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "Build successful!"
    
    # Create deployment directory if it doesn't exist
    mkdir -p deploy
    
    # Copy build files to deployment directory
    cp -r dist/* deploy/
    
    echo "Files copied to deploy directory"
    echo "You can now deploy the contents of the 'deploy' directory to your hosting service"
else
    echo "Build failed!"
    exit 1
fi 