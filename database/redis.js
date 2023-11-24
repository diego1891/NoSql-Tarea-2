import redis from "redis";
import { promisify } from "util";

const client = redis.createClient({
  socket: {
    host: 'rediscache',
    port: 6379,      
  },
});

const dbConnectionRedis = async () => {

  client.connect();
  console.log("El cliente es" + client);

  client.on("connect", () => {
    console.log("Conectado a Redis");
  });

  client.on("error", (err) => {
    console.error(`Error de conexión a Redis: ${err}`);
  });
};

const getAsync = async () => {await promisify(client.get).bind(client);};

export { dbConnectionRedis, getAsync,client };
