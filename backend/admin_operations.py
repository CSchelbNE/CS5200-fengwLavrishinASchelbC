import sqlalchemy.exc
from database import get_db, run_transaction
from sqlalchemy.engine import Engine
from fastapi import status, HTTPException, Depends
from fastapi import APIRouter
from schemas import Approval

admin_router = APIRouter(
    prefix="/admin",
    tags=['admin']
)


@admin_router.get("/get-all-approvals")
def get_approvals(db: Engine = Depends(get_db)):
    def get_approvals_callback(conn, kwargs):
        result = conn.execute("""CALL getApprovals()""").all()
        return result
    return run_transaction(db, get_approvals_callback)


@admin_router.put("/status-change/{approval_id}")
def change_status(approval: Approval, approval_id: int, db: Engine = Depends(get_db)):
    def change_status_callback(conn, kwargs):
        result = conn.execute(f"""CALL editApprovalStatus(%s, %s)""",
                                     (str(kwargs["approval_id"]), str(kwargs["status"]))).first()
        return result
    return run_transaction(db, change_status_callback, approval_id=approval_id, status=approval.status)
