How should I format git diffs (also known as patches) for summarizing with LLMs?

When formatting Git diffs for summarizing with Large Language Models (LLMs), here are
some guidelines to help you create a clear and concise patch:

1. **Use a consistent diff format**: Stick to a standard diff format, such as the
unified diff format (also known as the "simple" or "traditional" format). This will
make it easier for LLMs to process and understand the diffs.
2. **Limit the number of changes**: Try to limit the number of changes in each patch to
10-20 lines of code. This will help LLMs focus on the most relevant changes and avoid
information overload.
3. **Use clear and concise commit messages**: Make sure your commit messages are brief,
descriptive, and accurate. This will help you create a clear summary of what was
changed in the patch.
4. **Remove unnecessary whitespace**: Remove any unnecessary whitespace, such as blank
lines or excessive indentation, to make the diffs easier to read.
5. **Focus on the most relevant changes**: Identify the most significant changes made
in the patch and focus on summarizing those first. This will help you create a more
effective summary for LLMs.
6. **Avoid using Git's built-in diff filters**: Avoid using Git's built-in diff
filters, such as `-w` or `--ignore-blank`, which can make the diffs harder to read and
understand for LLMs.
7. **Use Markdown formatting**: Use Markdown formatting to highlight changes, add
context, and make the diffs more readable.

Here's an example of a well-formatted Git diff patch:

```markdown
# Fixed bug in user authentication

## Changed files:
- `auth/user.py`

## Changes:
### Added a new check for invalid credentials
```python
def authenticate_user(username, password):
    # ...
    if not username or not password:
        raise ValueError("Invalid credentials")
```
### Updated the error message to include more details
```python
except ValueError as e:
    logger.error(f"Authentication failed: {e}")
```

## Removed unnecessary whitespace from user registration code
```python
user = User(username=username, email=email)
user.save()
```
becomes

```python
user = User(username=username, email=email)
user.save()
```

## Fixed a typo in the password hashing function
```python
def hash_password(password):
    # ...
    return hashlib.sha256((password + salt).encode()).hexdigest()
```
becomes

```python
def hash_password(password):
    # ...
    return hashlib.sha256((password + salt.encode()).hexdigest())
```

By following these guidelines, you can create well-formatted Git diff patches that will
help LLMs better understand the changes made in your code.

Here are some common formats for summarizing git diffs:

1. Unformatted: This is a plain text representation of the diff.

2. Unified Diff: This format is widely used and provides a clear view of the
differences between two versions of files.

3. Patch Format: This is a format that allows you to attach a patch to an email or
other message, making it easy to share changes with others.

4. Markdown Format: You can use markdown formatting to highlight changes, add context,
and make the diffs more readable.

You can use tools like `git diff` or `git log --diff-filter=M` to generate diffs in
various formats.

For LLMs, it's best to provide a unified diff or patch format that is easy to read and
understand. You can also use Markdown formatting to add context and highlight changes.
