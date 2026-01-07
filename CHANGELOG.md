# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased] - 2026-01-07

### Added
- **Static Navbar**: Fixed navigation bar with category filters, bucket button, and AI chat button.
- **Bucket Modal**: Click bucket to view selected tools with remove functionality and "Clear All" button.
- **Dynamic Versions API**: New `/api/versions` endpoint fetches real versions from:
    - Node.js official releases
    - Go official releases  
    - Python (via endoflife.date)
    - Rust via GitHub Releases
    - Docker via GitHub Releases
- **Script Existence Checks**: Generated scripts now check if tools are installed before attempting installation.

### Changed
- Moved category filters from main content area to fixed navbar for better UX.
- Refactored PackageManager to use new Navbar component.
- Script generator now uses `command -v` to detect existing installations.

---

## [0.1.0] - 2025-12-30

### Added
- **Expanded App Catalog**: Added support for major programming languages and DevOps tools.
    - Languages: Rust, Go, Python 3, Java, C++.
    - Containers: Podman, Kubectl, Minikube, Containerd.
    - DevOps: Terraform, Ansible.
- **Smart AI Actions**: "Root" AI can now perform actions on the user's bucket.
- **Platform Badges**: UI now clearly indicates "Mac Only" apps.
- **Version Selection**: Added support for multiple versions.
