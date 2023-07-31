# Use the official OpenJDK base image
FROM amazoncorretto:17

# Set the working directory inside the container
WORKDIR /app

# Copy the built Jar file into the container
COPY build/libs/*.jar app.jar

# Expose the port that the Spring Boot application will run on
EXPOSE 48080

# Command to run the Spring Boot application
CMD ["java", "-jar", "app.jar"]
