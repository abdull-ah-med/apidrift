"""Parse and detect input kinds for APIDrift."""

from __future__ import annotations

import json
from typing import Any

import yaml

from app.schemas.diff import InputKind


class ParseError(ValueError):
    """Raised when input cannot be parsed as JSON or YAML."""


def parse_document(raw: str) -> Any:
    text = raw.strip()
    if not text:
        raise ParseError("Input is empty")
    try:
        return json.loads(text)
    except json.JSONDecodeError:
        try:
            return yaml.safe_load(text)
        except yaml.YAMLError as exc:
            raise ParseError(f"Unable to parse as JSON or YAML: {exc}") from exc


def looks_like_openapi(doc: Any) -> bool:
    if not isinstance(doc, dict):
        return False
    if "openapi" in doc or "swagger" in doc:
        return True
    return "paths" in doc and ("info" in doc or "components" in doc)


def detect_input_kind(before_doc: Any, after_doc: Any) -> InputKind:
    if looks_like_openapi(before_doc) and looks_like_openapi(after_doc):
        return InputKind.OPENAPI
    return InputKind.JSON_RESPONSE
