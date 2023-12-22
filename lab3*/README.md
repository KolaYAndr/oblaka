# Лабораторная работа №3*

## Цель работы *
Сделать красиво работу с секретами. Например, поднять Hashicorp Vault и сделать так, чтобы ci/cd пайплайн ходил туда, брал секрет, использовал его не светя в логах

## Выполнение *
Для красивого хранения секретов было решено использовать Hashicorp Vault

### Настройка Hashicorp Vault
*В какой-то момент я запутался в количестве "терминалов" поэтому решил запустить счётчик и указывать какой конкретно я запускал*

Для запуска сервера локально нужно выполнить команду в командной строке Windows

```bat
vault server -dev -dev-root-token-id root
```
*Счётчик открытых терминалов: __1__*

### Создание секретов
Нужно открыть второй терминал, на этот раз bash

*Счётчик открытых терминалов: __2__*

В нём нужно запустить команду

```bash
# set env vars
export VAULT_ADDR=http://127.0.0.1:8200
export VAULT_TOKEN=root

# save secrets
/c/Users/kolay/Downloads/vault_1.15.4_windows_amd64/vault kv put secret/docker DOCKERHUB_USERNAME=kolayandr DOCKERHUB_ACCESS_TOKEN=dckr_pat_YKk_Z_pbXsCR7HlhPueErwS95W4

# create policy to read secret
/c/Users/kolay/Downloads/vault_1.15.4_windows_amd64/vault policy write docker-secret-reader - <<EOF
path "secret/data/docker" {
    capabilities = ["read"]
}
EOF

# create env var with policy token
GITHUB_REPO_TOKEN=$(/c/Users/kolay/Downloads/vault_1.15.4_windows_amd64/vault token create -policy=docker-secret-reader -format json | /c/Users/kolay/Downloads/vault_1.15.4_windows_amd64/jq -r ".auth.client_token")

# test: getting token via policy token
VAULT_TOKEN=$GITHUB_REPO_TOKEN /c/Users/kolay/Downloads/vault_1.15.4_windows_amd64/vault kv get secret/docker
```

Для проверки можно посмотреть секреты в интерфейсе Vault через браузер по адресу VAULT_ADDR=http://127.0.0.1:8200

### Создание Self-host runner в GitHub
Наш Vault был запущен локально, поэтому нужно, чтобы Actions GitHub'а тоже запускались локально, поэтому был создан и настроен self-hosted runner
