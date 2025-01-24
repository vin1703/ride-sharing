// redis.js

import Redis from "ioredis";

// Initialize Redis client
const redis = new Redis({
  host: "redis-19549.c330.asia-south1-1.gce.redns.redis-cloud.com",
  port: 19549,                 
  password:"ocJOBvMAlXPk7PV39zvTycN0jMMt7EQC",                                        
});
// Optionally handle Redis events like connection, error, etc.
redis.on('connect', () => {
  console.log('Connected to Redis');
});

redis.on('error', (err) => {
  console.error('Redis error:', err);
});

// Export the Redis client so it can be used in other files
export default redis;
