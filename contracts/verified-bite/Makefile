INFURA = https://mainnet.infura.io/v3/c244f13ed2c94cb0986ec69fb9792afb
PORT = 8545
ADMIN = 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
ADMIN_PK = 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80

build:
	forge build --extra-output abi

deploy-local:
	anvil &
	@sleep 3
	forge create --rpc-url localhost:$(PORT) --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80 src/VerifiedBite.sol:VerifiedBite --constructor-args $(ADMIN)

down:
	@echo "Killing process on port $(PORT)..."
	@-kill -9 $(shell lsof -t -i:$(PORT)) 2>/dev/null
	@echo "Process on port $(PORT) killed."
