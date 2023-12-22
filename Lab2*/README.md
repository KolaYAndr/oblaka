# Отчет по лабораторной работе №2
## Цель работы
Настроить подключение к сервису в миникубе через https

## Ход работы
Работа выполнялась на VirualBox c ОС Ubuntu 22.04
### Ingress
В продолжение работы с лабораторной работой 2, для начала, после запуска minikube,
был активирован набор правил ingress 

`minikube addons enable ingress`

![Акивация ingress](https://github.com/KolaYAndr/oblaka/blob/main/Lab2*/Images/Image%201.png)

А в раздел DNS-записей был добавлен наш адрес

![Добавление записи в DNS](https://github.com/KolaYAndr/oblaka/blob/main/Lab2*/Images/Image%202.png)

### Самоподписанный сертификат
На данном этапе нужно было создать самоподписанный сертификат.

Сертификат был создан на один год в дирректории вместе с file.yml

`openssl req -x509 -sha256 -nodes -days 365 -newkey rsa:2048 -keyout privateKey.key -out certificate.crt`

![Создание сертификата](https://github.com/KolaYAndr/oblaka/blob/main/Lab2*/Images/Image%203.png)

![Сертификат в директории](https://github.com/KolaYAndr/oblaka/blob/main/Lab2*/Images/Image%204.png)

### Ingress.yml
После файл file.yml (из предыдущей работы) был дополнен информацией об ingress
```
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: my-ingress
  annotations:
    nginx.ingress.kubernetes.io/add-base-url: "true"
spec:
  ingressClassName: nginx
  tls:
    - hosts:
      - choma-host
      secretName: choma-lab2-tls
  rules:
  - host: choma-host
    http:
      paths:
      - pathType: Prefix
        path: "/"
        backend:
          service:
            name: my-service
            port: 
              number: 3000
```

### Запуск
Запускаем `kubectl apply -f file.yml`

И проверяем, что все сервисы, поды и ingress запущены

![Проверка](https://github.com/KolaYAndr/oblaka/blob/main/Lab2*/Images/Image%205.png) 
### Результат
Переходим в браузепе по адресу `https://choma-host`

И видим, что браузер обнаружил самоподписанный сертификат

![Обнаружение сертификата](https://github.com/KolaYAndr/oblaka/blob/main/Lab2*/Images/Image%206.png)

![Открытый сертификат](https://github.com/KolaYAndr/oblaka/blob/main/Lab2*/Images/Image%207.png)

## Вывод
В результате выполнения работы был изучен набор правил ingress и изучен способ самостоятельного подписания сертификатов
