#!/bin/bash

API_URL="http://localhost:3001/api"

# Register User
echo "Registering user..."
REGISTER_RESPONSE=$(curl -s -X POST -H "Content-Type: application/json" -d '{"username":"test","email":"test@test.com","password":"test"}' "$API_URL/register")
echo "User registered: $REGISTER_RESPONSE"

# Login User
echo "Logging in..."
LOGIN_RESPONSE=$(curl -s -X POST -H "Content-Type: application/json" -d '{"email":"test@test.com","password":"test"}' "$API_URL/login")
TOKEN=$(echo "$LOGIN_RESPONSE" | jq -r '.token') 

if [ "$TOKEN" == "null" ] || [ -z "$TOKEN" ]; then
    echo "Login failed, could not retrieve token."
    exit 1
fi

echo "Token retrieved: $TOKEN"

# Add Goal to User
echo "Adding goal..."
ADD_GOAL_RESPONSE=$(curl -s -X POST "$API_URL/user/goal" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "specific": "Read more books",
    "measurableContext": "Books read",
    "measurableValue": 5,
    "measurableUnit": "times",
    "achievable": "Read 30 mins daily",
    "relevant": "Improve knowledge",
    "timebound": "2024-06-01"
  }')

echo "Goal added: $ADD_GOAL_RESPONSE"

# Extract Goal ID
GOAL_ID=$(echo "$ADD_GOAL_RESPONSE" | jq -r '.goal._id')

if [ "$GOAL_ID" == "null" ] || [ -z "$GOAL_ID" ]; then
    echo "Failed to retrieve Goal ID."
    exit 1
fi

echo "Goal ID retrieved: $GOAL_ID"

# Update Goal Before Deleting User
echo "Updating goal..."
UPDATE_GOAL_RESPONSE=$(curl -s -X PUT "$API_URL/user/goal/$GOAL_ID" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "specific": "Updated test",
    "measurableContext": "Updated test",
    "measurableValue": 50,
    "measurableUnit": "words",
    "achievable": "Updated test",
    "relevant": "Updated test",
    "timebound": "2025-03-25T00:00:00.000Z"
  }')

echo "Goal updated: $UPDATE_GOAL_RESPONSE"

# Fetch User
echo "Fetching user data..."
USER_DATA_RESPONSE=$(curl -s -X GET -H "Authorization: Bearer $TOKEN" "$API_URL/user")

echo "User Data: $USER_DATA_RESPONSE"

# Prompt for goal deletion
read -p "Do you want to delete the goal? Enter 'yes' to delete or anything else to skip: " DELETE_GOAL_CONFIRMATION

# (Optionally) Delete Goal
if [ "$DELETE_GOAL_CONFIRMATION" == "yes" ]; then
    echo "Deleting goal..."
    DELETE_GOAL_RESPONSE=$(curl -s -X DELETE "$API_URL/user/goal/$GOAL_ID" \
      -H "Authorization: Bearer $TOKEN")
    
    echo "Goal deleted: $DELETE_GOAL_RESPONSE"
else
    echo "Goal not deleted. Skipping goal deletion."
fi

# Prompt for user deletion
read -p "Do you want to delete the user? Enter 'yes' to delete or anything else to skip: " DELETE_CONFIRMATION

# (Optionally) Delete User
if [ "$DELETE_CONFIRMATION" == "yes" ]; then
    echo "Deleting user..."
    DELETE_USER_RESPONSE=$(curl -s -X DELETE "$API_URL/user" \
      -H "Authorization: Bearer $TOKEN")
    
    echo "User deleted: $DELETE_USER_RESPONSE"
else
    echo "User not deleted. Exiting script."
fi