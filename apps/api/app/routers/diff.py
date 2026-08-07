"""Diff HTTP routes."""

from __future__ import annotations

from fastapi import APIRouter, HTTPException

from app.schemas.diff import (
    DiffRequest,
    DiffResult,
    MigrationGuideRequest,
    MigrationGuideResponse,
)
from app.services.openapi_diff import OpenAPIValidationError
from app.services.pipeline import run_diff, run_migration_guide

router = APIRouter(prefix="/v1", tags=["diff"])


@router.post("/diff", response_model=DiffResult)
def create_diff(body: DiffRequest) -> DiffResult:
    try:
        return run_diff(body)
    except (ValueError, OpenAPIValidationError) as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc


@router.post("/migration-guide", response_model=MigrationGuideResponse)
def create_migration_guide(body: MigrationGuideRequest) -> MigrationGuideResponse:
    markdown = run_migration_guide(body.result, body.title)
    return MigrationGuideResponse(markdown=markdown)
