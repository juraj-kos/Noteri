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
				if line[:3] == "<g " or line[:7] == "<filter":
					quoteStart = line.index('"') + 1
					quoteEnd = line.index('"', quoteStart)
					prefix = ""
					suffix = ""
					if line[:3] == "<g ":
						prefix = "url(#"
						suffix = ")"
					newLine = line[:quoteStart] + prefix + "filter-" + iconFile.split('.')[0] + suffix + line[quoteEnd:]
					fileAccumulator = fileAccumulator + newLine
				elif line[:5] == "<path":
					if "fill" in line:
						newLine = line[:line.index("fill") - 1] + 'fill="currentColor"/>\n'
					else:
						newLine = line[:line.index("/>")] + ' fill="currentColor"/>\n'
					fileAccumulator = fileAccumulator + newLine
				else:
					fileAccumulator = fileAccumulator + line
				# if line[:4] == "<svg" or line[:5] == "</svg":
				# 	fileAccumulator = fileAccumulator + line
				# 	fileAccumulator = fileAccumulator + newLine
			# print(fileAccumulator)

		with open(iconPath, 'w') as iconFileOpen:
			iconFileOpen.write(fileAccumulator)