# Лабораторная работа 4 *

## Цель работы *
Настроить алерт кодом (не в интерфейсе графаны:), показать пример его срабатывания.Попробовать сделать так, чтобы он приходил, например, на почту или в телеграм. Eсли не получится - показать имеющийся результат и аргументировать, почему дальше невозможно реализовать.

## Выполнение *
Для удобства было принято решение о переустановке Prometheus, AlertManager и Stats с репозиториев

https://github.com/techiescamp/kubernetes-prometheus - Prometheus

https://github.com/bibinwilson/kubernetes-alert-manager.git - AlertManager

clone https://github.com/devopscube/kube-state-metrics-configs.git - Stats

### Обустройство среды для телеграм
Через @BotFather создали бота. Самое сложное было выбрать незанятый ник

<img src='./photos/bot.jpg' width='520px'/>

После нужно было создать канал, в который бот был добавлен как администратор, и куда в дальнейшем будет отправлять сообщения. Но для этого нужно узнать id чата, поэтому в чат было отправлено сообщение. И перейдя по ссылке https://api.telegram.org/bot6871802424:AAEtm-9YL0lw9OE65mTyKq6PZoXBDzML7Pk/getUpdates, узнаём id чата

<img src='./photos/chatid.jpg' width='1040px'/>
Для телеги всё готово

### Изменяем файлы AlertManager'а
Для работы нужно изменить configmap у AlertManager'а. Вот так он выглядит в моём случае:
```
kind: ConfigMap
apiVersion: v1
metadata:
  name: alertmanager-config
  namespace: monitoring
data:
  config.yml: |-
    global:
    templates:
    - '/etc/alertmanager/*.tmpl'
    route:
      receiver: telegram
      group_by: ['alertname', 'priority']
      group_wait: 10s
      repeat_interval: 30m
      routes:
        - receiver: telegram
          match:
            severity: 'critical'
          group_wait: 10s
          repeat_interval: 1m

    receivers:
    - name: telegram
      telegram_configs:
      - api_url: https://api.telegram.org
        bot_token: 6871802424:AAEtm-9YL0lw9OE65mTyKq6PZoXBDzML7Pk
        chat_id: -1001980980628
        disable_notifications: false
        http_config:
          follow_redirects: true
        send_resolved: true
        parse_mode: 'HTML'
```

Далее можно перейти по адресу localhost:9090 и увидеть появившееся правило
<img src='./photos/alertmanager.jpg' width='520px'/>
