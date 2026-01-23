import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, FlatList, ActivityIndicator, Alert } from "react-native";
import { api, Child } from "../lib/api";

export default function ChildrenScreen({ navigation }: any) {
  const [items, setItems] = useState<Child[]>([]);
  const [loading, setLoading] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDate, setBirthDate] = useState("1999-01-10"); // usa YYYY-MM-DD
  const [tutorId, setTutorId] = useState("tutor-001");

  async function load() {
    setLoading(true);
    try {
      const data = await api.listChildren();
      setItems(data);
    } catch (e: any) {
      Alert.alert("Error", e.message);
    } finally {
      setLoading(false);
    }
  }

  async function create() {
    try {
      const created = await api.createChild({ firstName, lastName, birthDate, tutorId });
      Alert.alert("Created", created.id);
      setFirstName("");
      setLastName("");
      await load();
    } catch (e: any) {
      Alert.alert("Error", e.message);
    }
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <View style={{ padding: 16, gap: 10 }}>
      <Text style={{ fontSize: 22, fontWeight: "700" }}>Children</Text>

      <Button title="Go to Attendance" onPress={() => navigation.navigate("Attendance")} />

      <Text style={{ marginTop: 10, fontWeight: "600" }}>Create child</Text>
      <TextInput placeholder="First name" value={firstName} onChangeText={setFirstName} style={{ borderWidth: 1, padding: 8 }} />
      <TextInput placeholder="Last name" value={lastName} onChangeText={setLastName} style={{ borderWidth: 1, padding: 8 }} />
      <TextInput placeholder="Birth date (YYYY-MM-DD)" value={birthDate} onChangeText={setBirthDate} style={{ borderWidth: 1, padding: 8 }} />
      <TextInput placeholder="Tutor ID" value={tutorId} onChangeText={setTutorId} style={{ borderWidth: 1, padding: 8 }} />
      <Button title="Create" onPress={create} disabled={!firstName || !lastName || !birthDate || !tutorId} />

      <View style={{ marginTop: 10 }}>
        <Button title="Refresh list" onPress={load} />
      </View>

      {loading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={{ paddingVertical: 8, borderBottomWidth: 1 }}>
              <Text style={{ fontWeight: "600" }}>
                {item.firstName} {item.lastName}
              </Text>
              <Text>ID: {item.id}</Text>
              <Text>Birth: {item.birthDate}</Text>
              <Text>Tutor: {item.tutorId}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}
