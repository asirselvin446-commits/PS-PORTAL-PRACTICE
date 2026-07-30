import re

with open('src/data/problems.ts', 'r') as f:
    content = f.read()

# We need to find where the array starts and ends.
# export const problems: Problem[] = [ ... ];
# Since we might have multiple `];` let's just find the first `export const problems: Problem[] = \[`
# and then just manually parse it or use string replacement.

# Let's extract the interface part:
interface_part = re.search(r'(.*?export const problems: Problem\[\] = \[)', content, re.DOTALL)
if interface_part:
    interface_part = interface_part.group(1)
else:
    print("Could not find interface part")
    exit(1)

# Now let's try to extract the array using a simple stack.
# wait, the file is compiled successfully, meaning it's valid syntax.
# The previous script did this:
#     content = content[:idx] + new_str + content[idx+2:]
# So it just appended elements and kept a single `];` at the end!
