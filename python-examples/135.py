# 135.py - ipaddress module: parse and manipulate IP networks
# `ipaddress` lets you parse IPv4/IPv6 addresses, build networks (CIDR),
# check membership, iterate hosts, and even compute subnet differences
# without reaching for an external library.

import ipaddress

# Individual addresses
ipv4 = ipaddress.IPv4Address("192.0.2.7")
ipv6 = ipaddress.IPv6Address("2001:db8::1")
print(ipv4, "-> reverse:", ipv4.reverse_pointer, "is private?", ipv4.is_private)
print(ipv6, "compressed:", ipv6.compressed, "exploded:", ipv6.exploded)

# Networks
net4 = ipaddress.IPv4Network("10.0.0.0/24", strict=False)
net6 = ipaddress.IPv6Network("2001:db8::/120", strict=False)
print(net4, "hosts:", net4.num_addresses, "usable:", net4.num_addresses - 2)
print("first/last host:", net4.network_address, net4.broadcast_address)

# Membership + iteration
for ip in list(net4.hosts())[:3]:
    print("host:", ip, "in net?", ip in net4)

# Subnetting
print("subnets (/26 of /24):", list(net4.subnets(new_prefix=26))[:3])

# AddressSet / network arithmetic (3.x): collapse and diff
big = ipaddress.collapse_addresses([
    ipaddress.IPv4Network("10.0.0.0/25"),
    ipaddress.IPv4Network("10.0.0.128/25"),
    ipaddress.IPv4Network("10.0.1.0/26"),
])
print("collapsed:", list(big))

a = ipaddress.IPv4Network("10.0.0.0/23")
b = ipaddress.IPv4Network("10.0.1.0/24")
print("a - b =", list(a.address_exclude(b)))
print("overlap a & b:", a.overlaps(b))
