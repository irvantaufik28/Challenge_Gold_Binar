# project_


#Database Model & Relation
    
![image](https://user-images.githubusercontent.com/107734134/185928923-ebf39c49-9023-4da4-83ce-d8204a20c83e.png)

**Running Api**

    
**1. Create Database , Migration & Insert Data**

```
sequelize db:create
sequelize db:migrate
sequelize db:seed:all
```
    
**2. TEST API**    


**Test Order Postman**
    
    
```
1. you must have account before order 
    - on folder auth 
    - register , then fill all attributes
    - on folder login, you should test login your account
```    
    
```    
2. on folder customer > order, choose to "create order" 
  - fill all attributes
 example : 
 ```
 ```
   {
    "items": [
        {
            "id": 1,
            "qty": 2    
             ]
    }
   ``` 
 
 
 **For two or more item order you can fill like this**
   
   ```
   example :
        {
    "items": [
     {
            "id": 1,
            "qty": 2
        },
        {
            "id": 2,
            "qty": 1
        },
      
        ]   
     }    
  
 
 ```
 **Try To Update Your Order**
 
 ```
    1. On folder customer > order chose to "update order"
        You can add or delete your item order
        if you have two item on your cart, but you want to change to only one, just remove it.
        for example :
  ```
  from like this
  ```
           {
    "items": [
     {
            "id": 1,
            "qty": 2
        },
        {
            "id": 2,
            "qty": 1
        },
      
        ]   
     }    
   ```
   
   
   
    to like this
    
    
     ```
      {
    "items": [
        {
            "id": 1,
            "qty": 2    
             ]
    }


    
  
