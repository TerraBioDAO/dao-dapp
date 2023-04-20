# Exec contract with getFoundry

# Install getFoundry

(source install)[https://book.getfoundry.sh/getting-started/installation]

# Run chain Anvil

```sh
anvil
```

```sh
anvil --block-time 5
```
(in second)

# Run test

```sh
forge test
```

```sh
forge script deploy --rpc-url anvil
```

# Run deploy

```sh
forge script deploy --rpc-url anvil --broadcast
```

# Exctract ABI

```sh
forge inspect <Contract> abi > <Contract>.abi
```


# Exctract Address
```sh
forge inspect <Contract> abi > <Contract>.abi
```