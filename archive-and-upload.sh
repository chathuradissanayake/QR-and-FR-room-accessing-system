#!/bin/bash

# Get the current directory name
CURRENT_DIR=$(basename "$PWD")
TAR_FILE="${CURRENT_DIR}.tar.gz"

# Folders to exclude (space-separated)
EXCLUDE_FOLDERS=("node_modules")

# Remote VM details
REMOTE_USER="root"
REMOTE_HOST="178.128.20.26"
REMOTE_PATH="/root"

# Check if tar is installed
if ! command -v tar &> /dev/null; then
    echo "Error: tar command not found. Please install tar."
    exit 1
fi

# Check if scp is installed
if ! command -v scp &> /dev/null; then
    echo "Error: scp command not found. Please install scp."
    exit 1
fi

# Build the exclude arguments
EXCLUDE_ARGS=""
for folder in "${EXCLUDE_FOLDERS[@]}"; do
    EXCLUDE_ARGS+=" --exclude=$folder"
done

# Create a tar.gz archive of the current directory excluding specified folders
echo "Archiving the current directory: $CURRENT_DIR"
eval "tar -czvf \"$TAR_FILE\" $EXCLUDE_ARGS ./*"

# Verify if tar was successful
if [ $? -ne 0 ]; then
    echo "Failed to create archive."
    exit 1
fi

echo "Successfully created archive: $TAR_FILE"

# Upload the tar file to the remote VM
echo "Uploading $TAR_FILE to $REMOTE_USER@$REMOTE_HOST:$REMOTE_PATH"
scp "$TAR_FILE" "$REMOTE_USER@$REMOTE_HOST:$REMOTE_PATH"

# Verify if scp was successful
if [ $? -eq 0 ]; then
    echo "Successfully uploaded $TAR_FILE to $REMOTE_USER@$REMOTE_HOST:$REMOTE_PATH"
else
    echo "Failed to upload $TAR_FILE to remote VM."
    exit 1
fi

# Cleanup the local tar file (optional)
read -p "Do you want to delete the local tar file? (y/n): " DELETE_LOCAL
if [[ "$DELETE_LOCAL" == "y" ]]; then
    rm "$TAR_FILE"
    echo "Local tar file deleted."
else
    echo "Local tar file retained."
fi