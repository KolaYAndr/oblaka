# Отчет по лабораторной работе №2
## Цель работы
Поднять локально Kubernetes кластер и развернуть в нем сервис

## Ход работы
Работа выполнялась на VirualBox c ОС Ubuntu 22.04
### Установка kubernetes
1) Был установлен kubectl
2) Был установлен minikube (+ Docker)

### Запуск minikube
Сначала была выполнена команда `minikube start`.

После чего можно было проверить ip кластера
![minikube ip](https://github.com/KolaYAndr/oblaka/blob/main/Lab2/Images/Image%201.png)

### Конфигурация сервиса
Для развертывания сервиса была выбрана стартовая страница Nginx.

Для этого был создан файл конфигурации yml-формата.
```apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-deployment
spec:
  replicas: 1
  selector:
    matchLabels:
      components: cloud-lab2
  template:
    metadata:
      labels:
        components: cloud-lab2
    spec:
      containers:
        - name: nginx-server
          image: nginx
          imagePullPolicy: Always
          ports:
            - containerPort: 80

---

apiVersion: v1
kind: Service
metadata:
  name: my-service
spec:
  type: NodePort
  ports:
    - port: 3000
      targetPort: 80
      nodePort: 31200
  selector:
    components: lab2
```

Запуск файла конфигурации `kubectl apply -f file.yml`

![kubectl apply -f file.yml](https://github.com/KolaYAndr/oblaka/blob/main/Lab2/Images/Image%203.png)

### Проверка
1) Проверяем запущенные сервисы `kubectl get services`, на которых видим порты нашего сервиса

   ![kubectl get services](https://github.com/KolaYAndr/oblaka/blob/main/Lab2/Images/Image%204.png)
   
2) Проверяем статусы подов `kubectl get pods`

   ![kubectl get pods](https://github.com/KolaYAndr/oblaka/blob/main/Lab2/Images/Image%205.png)

### Результат
Открывшая страница сервиса по адресу `http://192.168.49.2:31221`

![URL](https://github.com/KolaYAndr/oblaka/blob/main/Lab2/Images/Image%206.png)


## Вывод
В результате выполнения работ был изучена платформа контейнеризации Kubernetes, также изучены кластеры kubectl и minikube для написания файла развертывания сервисов.

