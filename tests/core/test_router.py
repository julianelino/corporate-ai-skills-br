from engines.reference_routing.router import route


def test_routes_payroll_to_payroll_specialist():
    result = route("Need payroll INSS review")
    assert result["primary"] == "payroll-br"
    assert result["mode"] == "SIMULATE"


def test_routes_simple_unknown_request_to_router():
    result = route("Convert 7h45 to decimal")
    assert result["primary"] == "corporate-router"
    assert result["mode"] == "ANALYZE"
