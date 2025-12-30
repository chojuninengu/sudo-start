# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased] - 2025-12-30

### Added
- **Expanded App Catalog**: Added support for major programming languages and DevOps tools.
    - Languages: Rust, Go, Python 3, Java, C++.
    - Containers: Podman, Kubectl, Minikube, Containerd.
    - DevOps: Terraform, Ansible.
- **Smart AI Actions**: "Root" AI can now perform actions on the user's bucket.
    - Implemented JSON structured output for the Chat API.
    - Implemented client-side action parsing to Add/Remove packages via chat.
- **Platform Badges**: UI now clearly indicates "Mac Only" apps (e.g., Arc Browser).
- **Version Selection**: Added support for multiple versions (e.g., Node 18/20/22).
- **Linux Support Enhancements**: Added support for Flatpak and Snap installation commands.

### Changed
- Refactored `src/lib/apps.ts` to be the single source of truth, removing legacy `packages.ts`.
- Updated Chat UI (`src/components/chat-window.tsx`) to handle structured AI responses gracefully.
- Improved System Prompt in `src/app/api/chat/route.ts` to be more agentic and strict with JSON output.

### Fixed
- Fixed build errors related to missing types in the package catalog.
- Fixed UI issues where Mac-only apps were selectable on Linux.
