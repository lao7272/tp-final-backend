pm2 start src/server.js --name="Server 1" --watch -i max -- 8080 CLUSTER

pm2 start src/server.js --name="Server 1" --watch -- 8080 


artillery quick --count 20 --num 50 http://localhost:8080/api/productos --output info-log-products-artillery.txt

artillery quick --count 20 --num 50 http://localhost:8080/api/productos --output info-log-products-artillery-cluster.txt


Para mongo store
MONGO STORE: mongodb+srv://testCoder:1234@cluster0.6r2bdsi.mongodb.net/?retryWrites=true&w=majority