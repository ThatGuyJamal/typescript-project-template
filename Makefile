# Scripts

# Clean and build the project
clean-and-format:
	@echo "Cleaning and building..."
	@rm -rf ./dist
	@yarn format
	@yarn build

# Clean the project on windows
clean-windows-dist:
	@echo "Cleaning..."
	@rmdir dist
	@yarn format
	@yarn build

# Run the project
run:
	@echo "Running..."
	@yarn start
	@echo Done!