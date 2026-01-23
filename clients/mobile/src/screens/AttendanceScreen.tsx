import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { api } from "../lib/api";

export default function AttendanceScreen() {
  const [childId, setChildId] = useState("");
  const [checkedInBy, setCheckedInBy] = useState("staff-001");

  const [attendanceId, setAttendanceId] = useState("");
  const [checkedOutBy, setCheckedOutBy] = useState("staff-001");

  async function doCheckIn() {
    try {
      const res = await api.checkIn({ childId, checkedInBy });
      Alert.alert("Checked in", res.id);
      if (res?.id) setAttendanceId(res.id);
    } catch (e: any) {
      Alert.alert("Error", e.message);
    }
  }

  async function doCheckOut() {
    try {
      const res = await api.checkOut(attendanceId, { checkedOutBy });
      Alert.alert("Checked out", res.id);
    } catch (e: any) {
      Alert.alert("Error", e.message);
    }
  }

  return (
    <View style={{ padding: 16, gap: 10 }}>
      <Text style={{ fontSize: 22, fontWeight: "700" }}>Attendance</Text>
      <Text style={{ marginTop: 10, fontWeight: "600" }}>Check-in</Text>
      <TextInput placeholder="Child ID" value={childId} onChangeText={setChildId} style={{ borderWidth: 1, padding: 8 }} />
      <TextInput placeholder="Checked in by" value={checkedInBy} onChangeText={setCheckedInBy} style={{ borderWidth: 1, padding: 8 }} />
      <Button title="Check-in" onPress={doCheckIn} disabled={!childId || !checkedInBy} />

      <Text style={{ marginTop: 18, fontWeight: "600" }}>Check-out</Text>
      <TextInput placeholder="Attendance ID" value={attendanceId} onChangeText={setAttendanceId} style={{ borderWidth: 1, padding: 8 }} />
      <TextInput placeholder="Checked out by" value={checkedOutBy} onChangeText={setCheckedOutBy} style={{ borderWidth: 1, padding: 8 }} />
      <Button title="Check-out" onPress={doCheckOut} disabled={!attendanceId || !checkedOutBy} />
    </View>
  );
}
