# 75.py - xml.etree.ElementTree: basic XML parse/build
import xml.etree.ElementTree as ET

root = ET.Element('root')
child = ET.SubElement(root, 'child')
child.text = 'content'
print(ET.tostring(root))
