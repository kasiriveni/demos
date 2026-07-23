# 117.py - XML building and parsing with ElementTree
import xml.etree.ElementTree as ET


def demo():
    root = ET.Element('tasks')
    t = ET.SubElement(root, 'task', attrib={'id': '1'})
    t.text = 'Write examples'
    xml = ET.tostring(root, encoding='unicode')
    print('XML:', xml)
    # parse back
    tree = ET.fromstring(xml)
    for task in tree.findall('task'):
        print('Task id:', task.get('id'), 'text:', task.text)


if __name__ == '__main__':
    demo()
