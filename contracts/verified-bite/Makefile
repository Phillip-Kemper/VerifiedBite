INFURA = https://mainnet.infura.io/v3/c244f13ed2c94cb0986ec69fb9792afb
PORT = 8545
ADMIN = 0x6CbAa746E1F17804E9b2b81222C9f4a0A50a64A9

build:
	forge build

deploy-local:
	anvil --fork-url $(INFURA) &
	forge create --rpc-url $(INFURA) --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80 src/VerifiedBite.sol:VerifiedBite --constructor-args $(ADMIN)
