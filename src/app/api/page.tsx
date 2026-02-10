"use client";

import { useState } from "react";
import { authService } from "@/api/services";
import type {
	SignupDto,
	UpdatePasswordDto,
	UpdateRoleDto,
	UpdateUserDto,
} from "@/api/types";
import { getErrorMessage } from "@/api/core/httpClient";

export default function TestPage() {
	const [logs, setLogs] = useState<string[]>([]);
	const [userId, setUserId] = useState(1);

	const addLog = (msg: string) => {
		const time = new Date().toLocaleTimeString("fa-IR");
		setLogs((prev) => [`[${time}] ${msg}`, ...prev]);
	};

	// ====================================================================
	// TESTS
	// ====================================================================

	const testSignup = async () => {
		try {
			const data: SignupDto = {
				email: "teest@examdple.com",
				fullName: "کارب تست",
				password: "Test123456",
				phoneNumber: "0912335678",
			};
			addLog("🔄 در حال ثبت‌نام...");
			await authService.signup(data);
			addLog("✅ ثبت‌نام موفق!");
		} catch (error: any) {
			addLog(`❌ خطا: ${error.message}`);
		}
	};

	const testGetProfile = async () => {
		try {
			addLog("🔄 دریافت پروفایل...");
			const profile = await authService.getProfile();
			addLog(`✅ پروفایل: ${profile.role} (ID: ${profile.id})`);
		} catch (error: any) {
			addLog(`❌ خطا: ${error.message}`);
		}
	};

	const testGetUserList = async () => {
		try {
			addLog("🔄 دریافت لیست کاربران...");
			const users = await authService.getUserList();
			addLog(`✅ ${users.length} کاربر دریافت شد`);
			users.forEach((u) => addLog(`  - ${u.fullName} (ID: ${u.id})`));
		} catch (error: any) {
			addLog(`❌ خطا: ${error.message}`);
		}
	};

	const testUpdateUser = async () => {
		try {
			const data: UpdateUserDto = {
				email: "newemail@test.com",
				fullName: "نام جدید تست",
			};
			addLog(`🔄 آپدیت کاربر ${userId}...`);
			const updated = await authService.updateUser(userId, data);
			addLog(`✅ آپدیت شد`);
		} catch (error: any) {
			addLog(`❌ خطا: ${error.message}`);
		}
	};

	const testUpdatePassword = async () => {
		try {
			const data: UpdatePasswordDto = { password: "NewPass1234" };
			addLog(`🔄 تغییر رمز کاربر ${userId}...`);
			const update = await authService.updatePassword(userId, data);
			addLog("✅ رمز تغییر کرد", update);
		} catch (error: unknown) {
			addLog(`❌ خطا: ${getErrorMessage(error)}`);
		}
	};

	const testUpdateRole = async () => {
		try {
			const data: UpdateRoleDto = { roleId: 1 };
			addLog(`🔄 تغییر نقش کاربر ${userId}...`);
			await authService.updateRole(userId, data);
			addLog("✅ نقش تغییر کرد");
		} catch (error: any) {
			addLog(`❌ خطا: ${getErrorMessage(error)}`);
		}
	};

	const testDeleteUser = async () => {
		try {
			addLog(`🔄 حذف کاربر ${userId}...`);
			await authService.deleteUser(userId);
			addLog("✅ کاربر حذف شد");
		} catch (error: any) {
			addLog(`❌ خطا: ${error.message}`);
		}
	};

	const testIsAuthenticated = () => {
		const isAuth = authService.isAuthenticated();
		addLog(`🔐 وضعیت: ${isAuth ? "✅ لاگین" : "❌ خارج"}`);
	};

	const testLogout = () => {
		authService.logout();
		addLog("🚪 خروج انجام شد");
	};

	return (
		<div dir="rtl" style={{ fontFamily: "monospace", padding: "20px" }}>
			<h1>🧪 تست Auth API</h1>

			<div style={{ marginBottom: "20px" }}>
				<label>User ID برای تست‌ها: </label>
				<input
					onChange={(e) => setUserId(Number(e.target.value))}
					style={{
						border: "1px solid #ccc",
						borderRadius: "4px",
						marginLeft: "10px",
						padding: "5px",
					}}
					type="number"
					value={userId}
				/>
			</div>

			<div style={{ display: "grid", gap: "10px", maxWidth: "400px" }}>
				<button onClick={testIsAuthenticated} style={buttonStyle}>
					بررسی وضعیت لاگین
				</button>
				<button onClick={testLogout} style={buttonStyle}>
					خروج (Logout)
				</button>
				<hr />
				<button onClick={testSignup} style={buttonStyle}>
					ثبت‌نام (Signup)
				</button>
				<button onClick={testGetProfile} style={buttonStyle}>
					دریافت پروفایل
				</button>
				<button onClick={testGetUserList} style={buttonStyle}>
					دریافت لیست کاربران
				</button>

				<button onClick={testUpdateUser} style={buttonStyle}>
					آپدیت کاربر
				</button>
				<button onClick={testUpdatePassword} style={buttonStyle}>
					تغییر رمز عبور
				</button>
				<button onClick={testUpdateRole} style={buttonStyle}>
					تغییر نقش
				</button>
				<button
					onClick={testDeleteUser}
					style={{ ...buttonStyle, background: "#d32f2f" }}
				>
					حذف کاربر
				</button>
			</div>

			<hr style={{ margin: "30px 0" }} />

			<h2>📋 لاگ‌ها:</h2>
			<div
				style={{
					background: "#1e1e1e",
					borderRadius: "8px",
					color: "#0f0",
					fontFamily: "monospace",
					fontSize: "13px",
					height: "400px",
					overflowY: "auto",
					padding: "15px",
				}}
			>
				{logs.length === 0 ? (
					<p style={{ color: "#888" }}>هنوز لاگی ثبت نشده...</p>
				) : (
					logs.map((log, i) => <div key={i}>{log}</div>)
				)}
			</div>

			<button
				onClick={() => setLogs([])}
				style={{ ...buttonStyle, background: "#555", marginTop: "10px" }}
			>
				پاک کردن لاگ‌ها
			</button>
		</div>
	);
}

const buttonStyle: React.CSSProperties = {
	background: "#1976d2",
	border: "none",
	borderRadius: "6px",
	color: "white",
	cursor: "pointer",
	fontSize: "14px",
	padding: "10px 15px",
};
