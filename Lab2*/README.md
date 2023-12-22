# Отчет по лабораторной работе №2
## Цель работы
Настроить подключение к сервису в миникубе через https

## Ход работы
Работа выполнялась на VirualBox c ОС Ubuntu 22.04
### Ingress
В продолжение работы с лабораторной работой 2, для начала, после запуска minikube,
был активирован набор правил ingress 

`minikube addons enable ingress`

КАРТНКА 1

А в раздел DNS-записей был добавлен наш адрес

КАРТНКА 2

### Самоподписанный сертификат
На данном этапе нужно было создать самоподписанный сертификат.

Сертификат был создан на один год в дирректории вместе с file.yml

`openssl req -x509 -sha256 -nodes -days 365 -newkey rsa:2048 -keyout privateKey.key -out certificate.crt`

КАРТИНКА 3

КАРТИНКА 4

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

КАРТИНКА 
### Результат
Переходим в браузепе по адресу `https://choma-host`

И видим, что браузер обнаружил самоподписанный сертификат

ДВЕ КАРТИНКИ

## Вывод
В результате выполнения работы был изучен набор правил ingress и изучен способ самостоятельного подписания сертификатов
