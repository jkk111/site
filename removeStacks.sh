instances=$(kubectl get stacks -l stackset=$APPLICATION --template '{{range .items}}{{.metadata.name}}{{"\n"}}{{end}}')
echo $instances
while read -r line; do
  if [[ "$line" != "" ]]; then
    echo "Killing Stack $line";
    kubectl delete stack $line;
  fi
done <<< $instances