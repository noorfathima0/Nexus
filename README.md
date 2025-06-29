# Nexus 🔗

> A lightweight CLI tool for managing Sonatype Nexus artifacts

---

## 🚀 Features

* List all repositories in a Nexus instance
* Upload/download artifacts via REST API
* Works with Maven, npm, Docker registries

---

## 📆 Requirements

* Java 8+
* Maven/Gradle
* A running Nexus Repository Manager instance (OSS/Pro)
* Nexus URL and credentials/API token

---

## ⚙️ Installation

### From source

```bash
git clone https://github.com/noorfathima0/Nexus.git
cd Nexus
mvn clean package
```

### Pre-built binaries (future)

* Binaries will be available on the Releases page.

---

## 🧰 Configuration

Environment variables:

| Variable     | Description       |
| ------------ | ----------------- |
| `NEXUS_URL`  | Nexus server URL  |
| `NEXUS_USER` | API username      |
| `NEXUS_PASS` | Password or token |

Or via config file:

```yaml
url: https://nexus.example.com
user: admin
pass: secret-token
```

---

## 📄 Contributing

1. Fork the project
2. Create your feature branch: `git checkout -b feature/fooBar`
3. Commit changes: `git commit -am 'Add some fooBar'`
4. Push branch: `git push origin feature/fooBar`
5. Open a Pull Request

---

