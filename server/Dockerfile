# Use the Go image as the base image
FROM golang:alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the entire project into the container
COPY . .

# Download and install Go dependencies
RUN go mod download

# Build the Go application inside the container
RUN go build -o server ./cmd

# Expose the port your Go application listens on
EXPOSE 8080

# Command to run your Go application
CMD ["./server"]