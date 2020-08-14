import os

currentDir = os.getcwd() 
iconsDir = os.path.join(currentDir, "src\\Media\\Icons")

for iconFile in os.listdir(iconsDir):
	if iconFile.split('.')[-1] != 'zip':
		iconPath = os.path.join(iconsDir, iconFile)
		print(iconPath)

		fileAccumulator = ""
		with open(iconPath) as iconFileOpen:
			for line in iconFileOpen.readlines():
				if line[:4] == "<svg" or line[:5] == "</svg":
					fileAccumulator = fileAccumulator + line
				elif line[:5] == "<path":
					if "fill" in line:
						newLine = line[:line.index("fill") - 1] + "/>\n"
					else:
						newLine = line
					fileAccumulator = fileAccumulator + newLine
			# print(fileAccumulator)

		with open(iconPath, 'w') as iconFileOpen:
			iconFileOpen.write(fileAccumulator)